import { useEffect, useState } from "react";

import CustomerSelect from "./CustomerSelect";
import { Customer, Role, fetchCustomers } from "./graphql";

function App(): JSX.Element {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const roles = [
    { name: "Admin", value: "ADMIN" as Role },
    { name: "Manager", value: "MANAGER" as Role },
  ];

  useEffect(() => {
    getCustomers();
  }, []);

  async function getCustomers() {
    try {
      const custData: Customer[] = await fetchCustomers();
      setCustomers(custData);
    } catch (err) {
      // Error handling
    }
  }

  return (
    <>
      <CustomerSelect customers={customers} roles={roles} defaultRole="ADMIN" />
    </>
  );
}

export default App;
