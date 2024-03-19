import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {items[items.length - 1].label}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          {items.map((item, index) => (
            <li key={index}>
              {index < items.length - 1 ? (
                <Link className="font-medium" to={item.link}>
                  {item.label} /
                </Link>
              ) : (
                <span className="font-medium text-primary">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
