export const InputBox = ({title, placeholder, type, onChange}) => {
    return <div className="text-left w-4/5">
        <div className="pt-3 font-semibold">{title}</div>
        <input onChange={onChange} className="mt-1 font-medium px-2 py-1 rounded outline-2 outline-gray-300 outline w-full" type={type} name="" id="" placeholder={placeholder}/>
    </div>
}