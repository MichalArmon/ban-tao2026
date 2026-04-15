import { useRecRule } from "../../../providers/RecRuleProvider";

import initialRecRuleValues from "../../helpers/recRules/initialValues/recRuleInitialValues";

import SessionForm from "../sessions/SessionForm";

function CreateRecRule() {
  const { handleSubmitCreateRecRule } = useRecRule();

  return (
    <SessionForm
      isEditMode={false}
      initialSessionValues={initialRecRuleValues}
      handleSubmitForm={handleSubmitCreateRecRule}
      defaultIsRecursive={true}
    />
  );
}

export default CreateRecRule;
