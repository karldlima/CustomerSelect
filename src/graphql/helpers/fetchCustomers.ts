import { generateClient } from "aws-amplify/api";

import { Customer } from "..";
import { ListZellerCustomers } from "../queries";

const client = generateClient({ authMode: "apiKey" });

type FetchCustomersQuery = {
  listZellerCustomers: {
    items: Customer[];
  };
};

export const fetchCustomers = async (): Promise<Customer[]> => {
  try {
    const custData = (await client.graphql({ query: ListZellerCustomers })) as {
      data: FetchCustomersQuery;
      errors: any[];
    };
    return custData.data.listZellerCustomers.items;
  } catch (err) {
    console.log("error fetching customers...", err);
    return [];
  }
};
