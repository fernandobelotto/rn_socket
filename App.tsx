import Main from "./Main";

import { RootSiblingParent } from "react-native-root-siblings";

export default function App() {
  return (
    <RootSiblingParent>
      <Main />
    </RootSiblingParent>
  );
}
