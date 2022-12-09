import React, { FC, useEffect, useState } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useFetch } from "../../shared/hooks/UseFetch";
import { IUser } from "../../models/UserModel";

import UsersList from "../components/UsersList";
import { getEndPoint, UserAPIs } from "../../api/api";

const Users: FC = () => {
  const [data, setData] = useState<IUser[]>([]);
  const {fetchData, isLoading, error, clearError} = useFetch();

  useEffect(() => {
    if(!fetchData) return;

    const fetchUsers = async () => {
      const data = await fetchData(getEndPoint + UserAPIs.GetUsers);
      setData(data.users);
    };

    fetchUsers();
  }, [fetchData]);

  if (isLoading)
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  
  
  if (error) return <ErrorModal error={error} onClear={clearError} />;

  return <UsersList users={data} />;
};

export default Users;
