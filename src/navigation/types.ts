  export type BottomTabParamList = {
    Home: undefined;
    Library: undefined;
    Profile: undefined;
  };
  
  export type RootStackParamList = {
    MainTabs: undefined;
    Home: undefined;
    Library: undefined;
    DocumentViewer: {
      uri: string;
      title: string;
    };
  };
  