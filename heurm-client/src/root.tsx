import { hot, setConfig } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { RecoilRoot } from "recoil";

const  Root = ()  => {
  setConfig({
    pureSFC: true,
  })
  

  return (
    <BrowserRouter>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default hot(module)(Root);
