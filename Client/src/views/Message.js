import React from "react";

// reactstrap components
import { Toast, ToastBody } from "reactstrap";

// Core Components

function Message() {
  return (
    <>
      <Toast className="bg-info">
        <div className="toast-header text-white">
          <img
            alt="..."
            className="rounded mr-2"
            src="https://demos.creative-tim.com/argon-design-system-pro-react/assets/img/tim.png"
          ></img>
          <strong className="mr-auto">Creative Tim</strong>{" "}
          <small>11 mins ago</small>
          <button
            type="button"
            className="ml-2 close"
            data-dismiss="toast"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <ToastBody className="text-white">
          Hello, world! This is an info toast message.
        </ToastBody>
      </Toast>
    </>
  );
}

export default Message;