import * as React from 'react';
import { IReactSearchBoxProps } from './IReactSearchBoxProps';
import { IReactSearchBoxState } from './IReactSearchBoxState';
import { Button } from 'office-ui-fabric-react/lib/Button';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

declare const window: any;

export default class ReactSearchBox extends React.Component<IReactSearchBoxProps, IReactSearchBoxState> {

  /**
   * Search results page uri.
   */
  public ResultsPageUri: string;

  constructor(props: IReactSearchBoxProps) {
    super(props);

    this.state = {
      searchQuery: ""
    } as IReactSearchBoxState;
  }

  public render(): React.ReactElement<IReactSearchBoxProps> {
    return (
      <div className="ms-Grid">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm10">
            <SearchBox
              className="react-search-box"
              onChange={this._handleInputChange.bind(this)}
              onSearch={this._handleSearch.bind(this)}
              labelText="Пошук">
            </SearchBox>
          </div>
          <div className="ms-Grid-col ms-u-sm2">
            <Button id="SearchButton" onClick={this._handleSearch.bind(this)}>
              Знайти
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Search button event handler.
   * @param event 
   */
  private _handleSearch(event: any): void {
    if (this.props.enableClassicResultPage) {

      this.ResultsPageUri = `${this.props.tenantUrl}/search/Pages/results.aspx`;

      if (!this.props.enableAllsiteSearch) {
        this.ResultsPageUri = this.props.absoluteUrl + `/_layouts/15/osssearchresults.aspx?k=${this.state.searchQuery}`;
      } else {
        this.ResultsPageUri += `?k=${this.state.searchQuery}`;
      }
    } else {

      this.ResultsPageUri = `${this.props.absoluteUrl}/_layouts/15/search.aspx`;
      if (!this.props.enableAllsiteSearch) {
        this.ResultsPageUri += `/siteall?q=${this.state.searchQuery}`;
      } else {
        this.ResultsPageUri += `?q=${this.state.searchQuery}`;
      }
    }

    this._redirect();
  }

  /**
   * Redirects to the results page. 
   * windows.location wrapper so stub can be created in the unit tests.
   */
  private _redirect(): void {

    window.location = this.ResultsPageUri;
  }

  /**
   * Search input handler.
   * @param searchQuery
   */
  private _handleInputChange(searchQuery: string): void {

    this.setState((prevState: IReactSearchBoxState, props: IReactSearchBoxProps): IReactSearchBoxState => {
      prevState.searchQuery = searchQuery;
      return prevState;
    });
  }
}
