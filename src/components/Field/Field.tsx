import * as React from 'react';
// import { IErrors } from '../../interfaces/IErrors';

// The available editors for the field
type Editor = "textbox" | "multilinetextbox" | "dropdown";

export interface IFieldProps {
    id: string; // The unique field name
    label?: string; // The label text for the field
    editor?: Editor; // The editor for the field
    options?: string[]; // The drop down items for the field
    value?: any; // The field value
}

export const Field: React.SFC<IFieldProps> = ({
    id,
    label,
    editor,
    options,
    value
}) => {
    return(
        <div className="form-group">
            { label && <label htmlFor={ id }>{ label }</label>}
            { editor!.toLowerCase() === "textbox" && (
                <input 
                    type="text" 
                    id={ id }
                    value= { value }
                    onChange={ (e: React.FormEvent<HTMLInputElement>) => console.log(e) }
                    onBlur={ (e: React.FormEvent<HTMLInputElement>) => console.log(e) }
                    className="form-control"
                />
            )}
            {editor!.toLowerCase() === "multilinetextbox" && (
                <textarea
                    id={ id }
                    value={ value }
                    onChange={
                        (e: React.FormEvent<HTMLTextAreaElement>) =>
                        console.log(e)
                    }
                    onBlur={
                        (e: React.FormEvent<HTMLTextAreaElement>) =>
                        console.log(e)
                    }
                    className="form-control"
                />
            )}
            {editor!.toLowerCase() === "dropdown" && (
                <select
                    id={ id }
                    name={ id }
                    value={ value }
                    onChange={
                        (e: React.FormEvent<HTMLSelectElement>) =>
                        console.log(e)
                    }
                    onBlur={
                        (e: React.FormEvent<HTMLSelectElement>) =>
                        console.log(e)
                    }
                    className="form-control"
                    >
                    { options &&
                        options.map(option => (
                        <option key={ option } value={ option }>
                            { option }
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

Field.defaultProps = {
    editor: "textbox"
};