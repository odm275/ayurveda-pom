import React, { useState } from "react";
import { Input, Button, HStack } from "@chakra-ui/react";

const DEFAULT_AMT = 1;

interface Props {
  register: any;
}

const NumberInput = ({ register }: Props) => {
  const [amt, setAmt] = useState(DEFAULT_AMT);

  const addAmt = () => setAmt(amt + 1);
  const subAmt = () => {
    if (amt <= 1) return;
    setAmt(amt - 1);
  };

  return (
    <HStack width="100%">
      <Button onClick={addAmt}>+</Button>
      <Input value={amt} />
      <Button onClick={subAmt}>-</Button>
      <input
        type="number"
        style={{ display: "none" }}
        value={amt}
        name="amt"
        {...register("amt")}
      />
    </HStack>
  );
};

export default NumberInput;
