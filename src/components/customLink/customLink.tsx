import { Link } from "react-router-dom";

type Props = {
  to: string;
  children: any;
  classes?: string
};

const CustomLink: React.FC<Props> = ({ to, children, classes = '' }) => {
  return (
    <Link
    className={classes}
      to={to}
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}>
        {children}
    </Link>
  );
};

export default CustomLink;
