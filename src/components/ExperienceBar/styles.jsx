import styled from 'styled-components';

export const Header = styled.div`
    display: flex;
    align-items: center;

    span{
        font-size: 1rem;
    }

    > div {
        flex: 1;
        height: 4px;
        border-radius: 4px;
        background: var(--gray-line);
        margin: 0 1.5rem;
        position: relative;
    }

    > div > div {
        height: 4px;
        border-radius: 4px;
        background: var(--green)
    }

    span.current-experience {
        position: absolute;
        top: 50px;
        transform: translateX(-50%)
    }

`