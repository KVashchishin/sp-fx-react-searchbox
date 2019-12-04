declare interface IReactSearchBoxStrings {
  PropertyPaneSearchOptions: string;
  BasicGroupName: string;
  ClassicResultPageLabel: string;
  SearchScopeLabel: string;
  CustomSearchLabel: string;
  SearchLabel: string;
  CustomSearchPlaceholderModeOnAlert: string;
}

declare module 'reactSearchBoxStrings' {
  const strings: IReactSearchBoxStrings;
  export = strings;
}
