import styled from "vue-styled-components";
const StateProps = { before: Boolean, ing:Boolean, after:Boolean };

export const State = styled("div", StateProps) `
    /* --state-color: #000000; */
    width: 6.3rem;
    height: 2.8rem;
    text-align: center;
    line-height: 2.8rem;
    /* background-color: var(--state-color); */
    background-color: ${(props) => (props.before ? "#0A2540": (props.ing ? "#2260FF" : "#797E9C"))};

    color: white;
    border-radius: 1.6rem;
    font-weight: 600;
    font-size: 1.2rem;
`;