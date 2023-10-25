import { useState } from "react"


export const useField = (id, name, type) => {

	const [ value, setValue ] = useState('')

	const onChange = (e) => {
		
		e ? setValue(e.target.value) : setValue('')
	}

	return {

		id,
		name,
		type,
		value,
		onChange
	}
}