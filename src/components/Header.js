import { useEffect } from "react";
import { styled } from "styled-components";
import { authInstance, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
import { selectUserName, selectUserPhoto, setUserLoginDetails } from "../features/userSlice";

const Header = (props) => {
    const dispatch = useDispatch()
    const history = useNavigate()
    const userName = useSelector(selectUserName)
    const userPhoto = useSelector(selectUserPhoto)

    function handleAuth() {
  // Sign in with the provider using a pop-up window
        signInWithPopup(authInstance, provider)
        .then((result) => {
      // Handle the successful sign-in
            setUser(result.user)
        console.log(result);
        })
        .catch((error) => {
      // Handle errors during the sign-in process
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Sign-in error:', errorCode, errorMessage);
        });
    }
    const setUser = (user) => {
        dispatch(
            setUserLoginDetails({
                name: user.displayName,
                email: user.email,
                photo:user.photoURL,
            })
        )
    }
    useEffect(() => {
        authInstance.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user)
                history.push("./home")
            }
        })
    },[userName])
    return <Nav>
        <Logo>
            <img src="./images/logo.svg" alt=" " />
        </Logo>
        {
            !userName ? <Login onClick={handleAuth}>Login</Login> :
                <>
        
        
                    <NavMenu>
                        <a href='/home'>
                            <img src="./images/home-icon.svg" alt="Home" />
                            <span>HOME</span>
                        </a>
                        <a href='/search'>
                            <img src="./images/search-icon.svg" alt="SEARCH" />
                            <span>SEARCH</span>
                        </a>
                        <a href='/watchlist'>
                            <img src="./images/watchlist-icon.svg" alt="WATCHLIST" />
                            <span>WATCHLIST</span>
                        </a>
                        <a href='/originals'>
                            <img src="./images/original-icon.svg" alt="ORIGINAL" />
                            <span>ORIGINALS</span>
                        </a>
                        <a href='/movies'>
                            <img src="./images/movie-icon.svg" alt="MOVIES" />
                            <span>SEARCH</span>
                        </a>
                        <a href='/series'>
                            <img src="./images/series-icon.svg" alt="SERIES" />
                            <span>SERIES</span>
                        </a>

                    </NavMenu>
                    <UserImg src = {userPhoto} alt={userName} />
                </>
        }
    </Nav>
}

const Nav = styled.nav`
    position: fixed;
    top:0;
    left:0;
    right:0;
    height: 70px;
    background-color:#090b13;
    display: flex;
    justify-content:space-between;
    align-items:center;
    padding: 0 36px;
    letter-spacing:5px;
    z-index:3;
`
const Logo = styled.a`
    padding:0;
    width:80px;
    margin-top:4px;
    max-height: 70px;
    font-size:0;
    display: inline-block;
    img{
        display:block;
        width 100%;
    }

`
const NavMenu = styled.div`
    align-items:center;
    display:flex;
    flex-flow:row nowrap;
    height:100%;
    justify-content:flex-end;
    margin:0px;
    padding:0px;
    position:reletive;
    margin-right:auto;
    margin-left:25px;

    a{
        display:flex;
        align-items:center;
        padding: 0 12px;

        img{
            height: 20px;
            min-width:20px;
            width:20px;
            z-index:auto;
        }
    }
    span{

        color: rgba(249,249,249);
        font-size:13px;
        letter-spacing: 1.42px;
        line-height:1.08;
        padding: 2px 0px;
        white-space:nowrap;
        position:relative;

    
        &:before{
            content:'';
            background-color:rgb(249,249,249);
            border-raadius: 0px 0px 4px 4px;
            bottom: -6px;
            height: 2px;
            opacity: 0px;
            left:0px;
            position: absolute;
            right: 0px;
            transform-origin: left center;
            transform : scaleX(0);
            transition: all 250ms cubic-bezier(0.25,0.46,0.45,0.94) 0s;
            visibility: hidden;
            width:auto;

        }
    }
    &:hover{
        a:hover{
            span:before{
            transform:scaleX(1);
            visibility: visible;
            opacity: 1 !important;

        }
        }

    }
    @media (max-width:768px){
        display:none;
    }
`
const Login = styled.a`
    background-color: rgba(0,0,0,0.0);
    padding: 8px 16px;
    text-transform:uppercase;
    letter-spacing:1.5px;
    border: 1px solid #f9f9f9;
    border-radius: 4px;
    transition; all 0.2s ease 0s;

    &:hover{
        background-color:#f9f9f9;
        color:#000;
        border-color:transparent;
    }
`
const UserImg = styled.img`
height: 100%;

`
export default Header