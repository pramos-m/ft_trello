import useMergeState from "hooks/useMergeState.js";

const	defaultStyles = {
	form: "flex flex-col gap-y-2",
	label: "",
	input: "w-full h-full p-1 bg-btn-grey-selected rounded-[0.313rem] shadow-inner text-sm",
	buttonsWrapper: "flex justify-between",
	submit: "w-2/5 text-sm rounded bg-neutral-200 p-1",
	close: "w-3",
};

function	Form({fields, submitTitle, onSubmit, onClose, styles = {}, formProps = {}}) {
	const [fieldsValue, mergeFieldsValue] = useMergeState(Object.fromEntries(fields.map(({name, initialValue}) => ([name, initialValue]))));
	const	formStyles = Object.assign({...defaultStyles}, styles);

	const	updateFormValue = e => {
		e.preventDefault();
		mergeFieldsValue({[e.target.name]: e.target.value});
	};

	const	handleSubmit = e => {
		e.preventDefault();

		const	data = Object.fromEntries(new FormData(e.target));

		onSubmit(data);
	};

	return (
		<form className={formStyles["form"]} onSubmit={handleSubmit} {...formProps}>
			{
				fields?.length > 0 && fields.map(({id, placeholder, name}, index) => {
					console.log(name, fieldsValue[name]);
					return <label key={id} htmlFor={`input${id}`} className={formStyles["label"]}>
						<input
							className={formStyles["input"]}
							id={`input${id}`} placeholder={placeholder} name={name} value={fieldsValue[name]} onChange={updateFormValue}
							autoFocus={index == 0}
						/>
						</label>
				}
				)
			}
			<div className={formStyles["buttonsWrapper"]}>
				<button type="submit" className={formStyles["submit"]}>
					{submitTitle}
				</button>
				<button type="button" onClick={onClose}>
					<img src="/icons/close.svg" className={formStyles["close"]}/>
				</button>
			</div>
		</form>
	);
}

export default Form;
