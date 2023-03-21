export default function BoutonCalculatrice (props) {
    const { onClick, value } = props

    return (
        <button onClick={() => onClick(value)}>
            {value}
        </button>
    )
}