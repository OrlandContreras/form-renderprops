import * as React from 'react';
import { IErrors } from '../../interfaces/IErrors';

export interface IFormProps {
    action: string; // The http path that the form will be posted to
    render: () => React.ReactNode;
}

export interface IValues {
    [key: string]: any; // Key value pairs for all the field values with key being the field name
}

export interface IFormState {
    values: IValues; // Field values
    errors: IErrors; // The field validation error messages
    submitSuccess?: boolean; // Whether the form has been successfully submitted
}

export class Form extends React.Component<IFormProps, IFormState> {
    constructor(props: IFormProps) {
        super(props);

        const errors: IErrors = {};
        const values: IValues = {};

        this.state = {
            errors,
            values
        };
    }

    /**
     * Returns whether there are any errors in the errors object that is passed in
     * @param {IErrors} errors - The field errors
     */
    private haveErrors(errors: IErrors) {
        let haveError: boolean = false;
        Object.keys(errors).map((key: string) => {
            if(errors[key].length > 0) {
                haveError = true;
            }
        });
        return haveError;
    }
    /**
     * Handles form submission
     *
     * @private
     * @memberof Form
     */
    private handleSubmit = async(
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        if (this.validateForm()) {
            const submitSuccess: boolean = await this.submitForm();
            this.setState({ submitSuccess });
        }
    };
    /**
     * Executes the validation rules for all the fields on the form and sets the error state
     *
     * @private
     * @returns {boolean} - Whether the form is valid or not
     * @memberof Form
     */
    private validateForm(): boolean {
        return true;
    }
    /**
     * Submits the form to the http api
     *
     * @private
     * @returns {Promise<boolean>} - Whether the form submission was successful or not
     * @memberof Form
     */
    private async submitForm(): Promise<boolean> {
        return true;
    }

    public render() {
        const { submitSuccess, errors } = this.state;
        return(
            <form onSubmit={ this.handleSubmit } noValidate={ true }>
                <div className="container">
                    { this.props.render() }
                    <div className="form-group">
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={ this.haveErrors(errors) }>Submit</button>
                    </div>
                    { submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            The form was successfully submitted!
                        </div>
                    )}
                    { submitSuccess === false && !this.haveErrors(errors) && (
                        <div className="alert alert-danger" role="alert">
                            Sorry, the form is invalid. Please review, adjust and try again
                        </div>
                    )}
                </div>
            </form>
        );
    }
}