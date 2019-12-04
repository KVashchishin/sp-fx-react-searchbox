import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';

import * as strings from 'reactSearchBoxStrings';
import ReactSearchBox from './components/ReactSearchBox';
import { IReactSearchBoxProps } from './components/IReactSearchBoxProps';
import { IReactSearchBoxWebPartProps } from './IReactSearchBoxWebPartProps';

import { IBranding } from './branding/IBranding';
import { Branding } from './branding/Branding';

import Utils from './Utils';

export default class ReactSearchBoxWebPart extends BaseClientSideWebPart<IReactSearchBoxWebPartProps> {
  private readonly _branding: IBranding = new Branding();

  public render(): void {

    const element: React.ReactElement<IReactSearchBoxProps> = React.createElement(
      ReactSearchBox,
      {
        customSearchLabel: this.properties.customSearchLabel,
        enableAllsiteSearch: this.properties.enableAllsiteSearch,
        tenantUrl: Utils.getTenantUrl(this.context.pageContext.site.absoluteUrl, this.context.pageContext.site.serverRelativeUrl),
        absoluteUrl: this.context.pageContext.site.absoluteUrl,
        enableClassicResultPage: this.properties.enableClassicResultPage
      }
    );

    // this._ensureDomEnhancements();

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    if(!this.properties.customSearchLabel){
      this.properties.customSearchLabel = strings.SearchLabel;
    }
    
    return new Promise<void>((resolve, reject) => {

      // this._branding.hideDefaultSearchBox();
      return resolve();
    });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneToggle('enableAllsiteSearch',{
                  label: strings.SearchScopeLabel
                }),
                PropertyPaneToggle('enableClassicResultPage',{
                  label: strings.ClassicResultPageLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

