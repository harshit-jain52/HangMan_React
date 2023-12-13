const Stickfigure = ({ hang }) => {
    return (
        <div className="stick">
            <img
                src={require(`./components/hang${hang}.png`)}
                alt="stickfigure"
            />
        </div>
    );
}

export default Stickfigure;