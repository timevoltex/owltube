import { BrowserRouter } from "react-router-dom";

import App from "App";
import { RecoilRoot } from "recoil";

function Root({ store }: any) {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default Root;
