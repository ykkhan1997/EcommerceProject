import React from "react";

const CheckoutSteps = ({ current = 0 }) => {
  return (
    <ul className="steps steps-vertical lg:steps-horizontal w-full mt-4">
      {["User LogIn", "Shipping Address", "Payment Method", "Place Order"].map(
        (step, index) => (
          <li
            key={step}
            className={`step${index <= current ? "step-primary" : ""}`}
          >
            {step}
          </li>
        )
      )}
    </ul>
  );
};

export default CheckoutSteps;
