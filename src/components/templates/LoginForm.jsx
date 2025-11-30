import React from "react";
import Text from "../atoms/Text";
import Button from "../atoms/Button";

function Forms({ content = [] }) {
  return (
    <>
      {content.map((item, index) => {
        if (item.type === "title") {
          return (
            <div key={item.key ?? index} className="mb-4 text-center">
              <Text variant="h2" className="h3 mb-0">
                {item.text}
              </Text>
            </div>
          );
        }

        if (item.type === "text") {
          return (
            <div key={item.key ?? index} className="mb-3 text-center">
              {item.text.map((t, i) => {
                const Tag = t.variant || "p";
                return (
                  <Tag key={i} className={t.className}>
                    {t.before}
                    {t.content}
                    {t.after}
                  </Tag>
                );
              })}
            </div>
          );
        }

        if (item.type === "inputs") {
          return (
            <div key={item.key ?? index} className="mb-4">
              {item.inputs.map((input, i) => (
                <div className="mb-3" key={i}>
                  {input.label && (
                    <label
                      htmlFor={input.name}
                      className="form-label fw-semibold"
                    >
                      {input.label}
                    </label>
                  )}
                  <input
                    id={input.name}
                    name={input.name}
                    type={input.type || "text"}
                    className="form-control"
                    placeholder={input.placeholder}
                    value={input.value}
                    onChange={input.onChange}
                  />
                </div>
              ))}
            </div>
          );
        }

        if (item.type === "button") {
          return (
            <div key={item.key ?? index} className="d-grid mt-3">
              <Button
                type={item.buttonType || "submit"}
                variant={item.variant || "primary"}
                onClick={item.onClick}
                disabled={item.disabled}
              >
                {item.text}
              </Button>
            </div>
          );
        }

        return null;
      })}
    </>
  );
}

export default Forms;
