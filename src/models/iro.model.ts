import { getIrosDocument, execute } from "./subgraph/.graphclient";

interface GetIrosResult {
	iros: {
		iroId: string;
		status: string;
		unitPrice: string;
		currency: string;
		currencyDecimals: string;
		softCap: string;
		hardCap: string;
		start: string;
		end: string;
	}[]
}

class IRO {
	public getIrosQuery: typeof getIrosDocument;

	constructor() {
		this.getIrosQuery = getIrosDocument;
	}

	public async getIros(iroIds: string[]): Promise<GetIrosResult> {
		const result = await execute(this.getIrosQuery, { variables: { iroIds } });
		return result?.data;
	}
}

export default IRO;