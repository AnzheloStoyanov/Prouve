import { Header, Footer,PopUpLayout } from "src/components";
import PropTypes from "prop-types";

const StoreLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <PopUpLayout/>
      <div>Bahur</div>
      <main>{children}</main>
      <Footer />     
    </div>
  );
};

export default StoreLayout;

StoreLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
