import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import LottieView from 'lottie-react-native';
import { useFonts } from 'expo-font';

import Button from './src/Button';
import { useCookie } from './src/use-cookie';
import { useTranslation } from './src/use-translation';
import LoadingView from './src/LoadingView';

/**
 * 스플래시 스크린의 아이콘 출처: https://kor.pngtree.com/freepng/fresh-made-crispy-fortune-cookie_6323404.html
 * 스플래시 스크린 만들기 가이드: https://docs.expo.dev/guides/splash-screens/
 * 스플래시 스크린 피그마 템플릿: https://www.figma.com/community/file/1155362909441341285
 */

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { t, locale, setLocale, format } = useTranslation();
  const { cookieKey } = useCookie();
  const [fontsLoaded] = useFonts({
    'RIDIBatang': require('./assets/fonts/RIDIBatang.otf'), // https://ridicorp.com/ridibatang
  });

  const [isLoaded, setIsLoaded] = useState(false);

  const y = new Date().getFullYear();
  const m = new Date().getMonth() + 1; // 0~11
  const d = new Date().getDate();
  const todayText = format(t('today_is'), y, m, d);

  const locales = [
    "ko",
    "en",
    "ja",
    "zh",
    "es",
  ];

  useEffect(() => {
    if (cookieKey !== "") {
      setIsLoaded(true);
    }
  }, [cookieKey]);
  useEffect(() => {
    if (locale !== null && fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [locale, fontsLoaded]);
 
  if (!isLoaded) return <LoadingView />;

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay={false}
        source={require('./assets/background.json')}
        resizeMode="cover"
        style={{
          position: "absolute",
          zIndex: -1,
        }}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topContainer}>
          <Text style={styles.todayText}>{todayText}</Text>
          <Text style={styles.cookieText}>{t(cookieKey)}</Text>
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.buttonsContainer}>
            {locales.map(item => (
              <Button 
                key={item}
                onPress={() => setLocale(item)}
                isSelected={locale === item}
                text={item.toUpperCase()}
              />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  todayText: {
    fontFamily: "RIDIBatang",
    position: "absolute",
    top: 70,
    fontSize: 13,
    color: "#8b658f",
  },
  cookieText: {
    fontFamily: "RIDIBatang",
    fontSize: 22,
    color: "#372538",
    textAlign: "center",
    marginHorizontal: 30,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 25,
  },
});
