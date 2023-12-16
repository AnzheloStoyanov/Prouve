import { Header } from "src/components";
import { AdminDrawer } from "src/components/AdminComponents";
import PropTypes from "prop-types";

const AdminLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <AdminDrawer/>
    </div>
  );
};

export default AdminLayout;

AdminLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
