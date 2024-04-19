import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../../../server';
import ReplyForm from '../TimeLine/ReplyForm';

const PostTimeLine = () => {
    const [posts, setPosts] = useState([]);
    const [activePostId, setActivePostId] = useState(null);

    useEffect(() => {
        axios.get(`${server}/timeline/getposts`, {
            withCredentials: true,
        }).then(response => {
            setPosts(response.data.posts);
            fetchUserDetails(response.data.posts);
        });
    }, []);

    const fetchUserDetails = async (postsData) => {
        try {
            const userIds = postsData.map(post => post.created_by);
            const uniqueUserIds = [...new Set(userIds)]; // Get unique user IDs
            
            const response = await axios.post(`${server}/user/getusersdetails`, { userIds: uniqueUserIds }, { withCredentials: true });
            const userDetailsMap = {};
            response.data.users.forEach(user => {
                userDetailsMap[user._id] = user;
            });
    
            // Function to format date
            const formatDate = (dateString, format = 'datetime') => {
                const date = new Date(dateString);
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear();
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                const seconds = date.getSeconds().toString().padStart(2, '0');
                const ampm = hours >= 12 ? 'PM' : 'AM';
                const formattedHours = hours % 12 || 12;
                return format === 'datetime' ? `${day}/${month}/${year} ${formattedHours}:${minutes}:${seconds} ${ampm}`: `${day}/${month}/${year}`;
            };
    
            // Convert created date format in posts
            const formattedPosts = postsData.map(post => ({
                ...post,
                createdFormattedDateTime: formatDate(post.created),
                createdFormattedDate: formatDate(post.created, 'date'),
                userDetails: userDetailsMap[post.created_by],
            }));
    
            setPosts(formattedPosts);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };
    
    const handleReplyClick = (postId) => {
        setActivePostId(postId);
    };

    const hideForm = () => {
        setActivePostId(null);
    }; 

    const renderPostContent = (post) => {
        const postFiles = JSON.parse(post.post_files);
        const hasPDF = postFiles.some(file => file.endsWith('.pdf'));

        return (
            <div key={post.post_id}>
                <p>{post.post_description}</p>
                {hasPDF ? (
                    <div>
                        <img src="images/icons/pdf.png" alt="PDF Icon" />
                    </div>
                ) : (
                    <div className="timeline-images mb15">
                        {postFiles.slice(0, 1).map((file, index) => (
                            <a key={index} href={`path_to_image/${file}`} className="mfp-image" data-title={file}>
                                <img src={`${file}`} alt={file} />
                                {postFiles.length > 1 && index === 0 && (
                                    <span className="more">+{postFiles.length - 1} More</span>
                                )}
                            </a>
                        ))}
                    </div>
                )}
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-corner-up-left icon-16"><polyline points="9 14 4 9 9 4"></polyline><path d="M20 20v-7a4 4 0 0 0-4-4H4"></path></svg>
                 <button onClick={() => handleReplyClick(post.post_id)}>Reply</button>
                 {activePostId === post.post_id && <ReplyForm postId={post.post_id} hideForm={hideForm}/>}
            </div>
        );
    };



    return (
        <div id="post_timeline" className="list-none w-full min-h-full mx-auto relative">
            {posts.map(post => (
                <div id={`post-content-container-${post.post_id}`} className="post-content" key={post.post_id}>
                    <div className="clearfix">
                        <div className="clearfix post-date">
                            <span className='bg-blue-500 text-white py-2 px-5 pb-2 rounded-lg'>{post.createdFormattedDate}</span>
                        </div>
                        <div className="mb-5 clearfix transition-all duration-1000 my-4 relative flex flex-col min-w-0 overflow-wrap-normal bg-white bg-clip-border border border-solid border-black border-opacity-25 rounded">
                            {/* card */}
                            <div className="p-4"> {/* Card-body */}
                                <div className="clearfix my-2">
                                    <div className="d-flex">
                                        <div className="w-100">
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 me-2">
                                                    <span className="avatar avatar-sm">
                                                        <img src="images/user/user-01.png" alt="..." />
                                                    </span>
                                                </div>
                                                <div className="w-100">
                                                    <div className="mt5">
                                                        {post.userDetails && post.userDetails.name ? (
                                                            <a href={`/user/${post.userDetails._id}`} className="text-zinc-950">{post.userDetails.name}</a>
                                                        ) : (
                                                            <span>Loading...</span>
                                                        )}
                                                    </div>
                                                    <small>
                                                        <span className="text-off">{post.createdFormattedDateTime}</span>
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0">
                                            {/* Dropdown button */}
                                        </div>
                                    </div>
                                </div>
                                {renderPostContent(post)}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostTimeLine;