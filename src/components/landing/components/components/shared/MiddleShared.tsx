import "./middleShared.css";

type Props = {};

function MiddleShared({}: Props) {
    return (
        <div>
            <div>
                <p>Check if grocery exists...</p>
                <select>
                    <option>Maize</option>
                </select>
            </div>

            <div>
                <div>
                    <input type="text" placeholder="Enter grocery" />
                    <input type="number" />
                    <select>
                        <option>ml</option>
                        <option>kg</option>
                    </select>
                </div>
                <div>
                    <button>+</button>
                </div>
            </div>
        </div>
    );
}

export default MiddleShared;
