import { IInputs, IOutputs } from "./generated/ManifestTypes";
import React = require("react");
import ReactDOM = require("react-dom");
import { initializeIcons } from '@uifabric/icons';
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;
import { AuthProvider } from "./AuthProvider";
import { IConfig } from "./interfaces/IConfig";
import { App, IAppProps } from "./App";

initializeIcons();

export class UserPresencesControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _container: HTMLDivElement;
	private _props: IAppProps;

	constructor() {}

	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
		this._container = container;

		context.mode.trackContainerResize(true);
		context.parameters.dataSet.paging.setPageSize(5000);

		this._props = {
			componentContext: context,
			authProvider: new AuthProvider({
				appId: context.parameters.azureADAppId.raw!,
				appRedirectUrl: context.parameters.azureADAppRedirectUrl.raw!,
				appAuthority: context.parameters.azureADAppAuthority.raw!,
				appScopes: [
					'user.read',
					'Presence.Read.All'
				]
			} as IConfig)
		};
	}

	public updateView(context: ComponentFramework.Context<IInputs>): void {
		if (context.parameters.dataSet.loading) return;
		
		this._props.componentContext = context;

		ReactDOM.render(
			React.createElement(App, this._props),
			this._container
		);
	}

	public getOutputs(): IOutputs {
		return {};
	}

	public destroy(): void {
		ReactDOM.unmountComponentAtNode(this._container);
	}
}