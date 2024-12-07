import * as ScreenOrientation from "expo-screen-orientation";

export async function changeScreenOrientation(flag = false) {
  if (!flag) {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
  } else {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
  }
}
