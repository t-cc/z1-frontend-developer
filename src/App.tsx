import React from "react";
import { RecoilRoot, useRecoilValue } from "recoil";
import { ShowId } from "./containers/ShowId";
import { TakePicture } from "./containers/TakePicture";
import { showTakePictureState } from "./state";

function Home() {
  const showTakePicture = useRecoilValue(showTakePictureState);
  return showTakePicture ? <TakePicture /> : <ShowId />;
}

function App() {
  return (
    <RecoilRoot>
      <Home />
    </RecoilRoot>
  );
}

export default App;
