import { useEffect } from "react";
import { useRecRule } from "../../../providers/RecRuleProvider";
import recRuleEditInitialValues from "../../helpers/recRules/initialValues/recRuleEditInitialValues";

import SessionForm from "../sessions/SessionForm";

function EditRecRule({ recRuleSelected, setIsDialogOpen }) {
  const { handleGetRecRule, handleSubmitEditRecRule, recRule } = useRecRule();
  useEffect(() => {
    if (recRuleSelected) {
      handleGetRecRule(recRuleSelected);
    }
  }, [recRuleSelected]);
  if (!recRule) return <>Loading...</>;

  const handleSaveAndCloseEdit = async (formData) => {
    try {
      await handleSubmitEditRecRule(recRuleSelected, formData);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving RecRule:", error);
    }
  };

  return (
    <>
      <SessionForm
        isEditMode={true}
        initialSessionValues={recRuleEditInitialValues(recRule)}
        handleSubmitForm={handleSaveAndCloseEdit}
        defaultIsRecursive={true}
      />
    </>
  );
}

export default EditRecRule;
