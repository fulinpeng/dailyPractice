

import Home from "_root/webApp/pages/home";
import Wellcome from "_root/webApp/pages/wellcome";
import AntForm from "_root/webApp/pages/antForm";
import AntTable from "_root/webApp/pages/antTable";

const routes = [
  {
    path: "/home",
    main: Home,
    footer: Home,
  },
  {
    path: "/wellcome",
    main: Wellcome,
    // footer: Wellcome,
  },
  {
    path: "/antForm",
    main: AntForm,
  },
  {
    path: "/antTable",
    main: AntTable,
  },
];

export default routes;