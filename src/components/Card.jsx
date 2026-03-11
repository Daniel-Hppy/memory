export function Card({handleClick, image, name}) {
    return (
        <div className="card" onClick={handleClick}>
            <img src={image} alt={name} />
            <p>{name}</p>
        </div>
    )
}