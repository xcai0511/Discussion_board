import "./index.css";
import React from "react";
import Form from '../../baseComponents/form';
import Input from '../../baseComponents/input';

const ChangePasswordForm = ({ 
    currPassword, setCurrPassword, 
    currPasswordError, 
    newPassword, setNewPassword, 
    newPasswordError, 
    handleSavePassword 
}) => {
    return (
        <div>
            <Form>
                <h3>Change Password</h3>
                <Input
                    title={"Current Password"}
                    id={"currPasswordInput"}
                    val={currPassword}
                    setState={setCurrPassword}
                    err={currPasswordError}
                />
                <Input
                    title={"New Password"}
                    id={"newPasswordInput"}
                    val={newPassword}
                    setState={setNewPassword}
                    err={newPasswordError}
                />
                <div className="btn_indicator_container">
                    <button
                        className="form_postBtn"
                        onClick={handleSavePassword}
                    >
                        <div>Change Password</div>
                    </button>
                    <div className="mandatory_indicator">
                        * indicates mandatory fields
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default ChangePasswordForm;