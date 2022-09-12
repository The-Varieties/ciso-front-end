import { useContext, useState } from "react";
import {Form, Button} from "react-boostrap"
import {ProfilePage} from './index';

const EditForm = ({userProfile}) => {

    const id = userProfile.id;

    const {updateUserProfile} = useContext(ProfilePage);

    return(
        <Form>
            
        </Form>
    )

}