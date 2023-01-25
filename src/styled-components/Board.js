import styled from "vue-styled-components";
const StateProps = { before: Boolean, ing:Boolean, after:Boolean };
const DateProps = {beforeCheck: Boolean, remainCheck: Number };

export const State = styled("div", StateProps) `
    /* --state-color: #000000; */
    width: 6.3rem;
    height: 2.8rem;
    text-align: center;
    line-height: 2.8rem;
    /* background-color: var(--state-color); */
    background-color: ${(props) => (props.before ? "#0A2540" : (props.ing ? "#2260FF" : "#797E9C"))};

    color: white;
    border-radius: 1.6rem;
    font-weight: 600;
    font-size: 1.2rem;
`;

export const DateText = styled("div", DateProps) `
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 2.1rem;

    margin-left: 0.8rem;
    
    color: ${(props) => (props.beforeCheck ? "#000000" : "#F10000")}
`;

export const WorkBtn = styled("button", DateProps) `
    width: 8rem;
    height: 2.9rem;
    /* background-color: #2260FF; */
    background-color: ${(props) => (props.remainCheck===-1 ? "#2260FF" : "#E6E9F8")};
    color: ${(props) => (props.remainCheck===-1 ? "white" : "#CBCFE8")};

    border-radius: 0.4rem;
    text-align: center;
    line-height: 2.8rem;
    font-weight: 600;
    font-size: 1.4rem;
`;