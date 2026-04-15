import axios from "axios";
import { createContext, useContext, useState } from "react";

import { useSnackBar } from "./SnackBarProvider";
import dayjs from "dayjs";
import { useUser } from "./UserProvider";
import { useNavigate } from "react-router-dom";
import normalizeRecRuleDetails from "../admin/helpers/recRules/normalization/normalizeRecRuleDetails";

const URL = "http://localhost:8000";
// const URL = "http://localhost:3000/api/v1";
const RecRuleContext = createContext();

// 2.create provider
export default function RecRuleProvider({ children }) {
  const [recRule, setRecRule] = useState(null);
  const [recRules, setRecRules] = useState([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [filteredRecRules, setFilteredRecRules] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();

  const { setSnack } = useSnackBar();
  // ✔️✔️✔️GET RecRuleS ✔️✔️✔️
  const getRecRulesFromServer = async () => {
    const response = await axios.get(`${URL}/recurring-rules`);
    const recRuleData = response.data;
    setRecRules(recRuleData);
    setFilteredRecRules(recRuleData);
    console.log(recRuleData);
  };

  const handleChange = (event) => {
    const value = event.target.value.toLowerCase();
    console.log(value);

    setFilteredRecRules(
      recRules.filter((recRule) =>
        recRule.name.official.toLowerCase().trim().includes(value),
      ),
    );
  };

  // ✔️✔️✔️CREATE RecRule ✔️✔️✔️

  const handleSubmitCreateRecRule = async (data) => {
    const recRuleDetailsForServer = normalizeRecRuleDetails(data);
    try {
      const response = await axios.post(
        `${URL}/recurring-rules`,
        recRuleDetailsForServer,
      );
      console.log(response);
      getRecRulesFromServer();
      setIsDialogOpen(false);
      setSnack("success", "Data saved successfully!");
    } catch (error) {
      setSnack("error", error.response.data);
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  // ✔️✔️✔️EDIT RecRule ✔️✔️✔️

  const handleSubmitEditRecRule = async (id, data) => {
    // const recRuleDetailsForServer = normalizeRecRuleDetails(data);

    try {
      console.log("data for server", data);
      const response = await axios.put(`${URL}/recurring-rules/${id}`, data);
      console.log(response);
      getRecRulesFromServer();
    } catch (error) {
      console.error("General Error Caught:", error);
      if (error.response) {
        console.log(error.response.data);
        alert(error.response.data.message);
      }
    }
  };

  // ✔️✔️✔️DELETE RecRule ✔️✔️✔️
  const handleDeleteRecRule = async (id) => {
    try {
      const response = await axios.delete(`${URL}/recurring-rules/${id}`);
      await getRecRulesFromServer();
    } catch (error) {
      console.log(error);
    }
  };

  // ✔️✔️✔️GET RecRule ✔️✔️✔️
  const handleGetRecRule = async (id) => {
    try {
      setRecRule(null);
      const response = await axios.get(`${URL}/recurring-rules/${id}`);
      console.log(response);
      setRecRule(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RecRuleContext.Provider
      value={{
        getRecRulesFromServer,
        recRules,
        setRecRules,
        handleChange,
        filteredRecRules,
        isDialogOpen,
        setIsDialogOpen,
        handleSubmitCreateRecRule,
        handleDeleteRecRule,
        handleGetRecRule,
        handleSubmitEditRecRule,
        recRule,
        setRecRule,

        setFilteredRecRules,
      }}
    >
      {children}
    </RecRuleContext.Provider>
  );
}

// 3. create custom hook for using the context(optional)
export const useRecRule = () => {
  const context = useContext(RecRuleContext);
  if (!context) {
    throw new Error("You used the message context of the RecRule provider!");
  }
  return context;
};
