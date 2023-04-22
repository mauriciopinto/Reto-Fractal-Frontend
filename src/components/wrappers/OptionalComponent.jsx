const OptionalComponent = (props) => {
    return props.show ? (
        <></>
    ) : (
        <>
            {
                props.children
            }
        </>
    )
}

export default OptionalComponent;