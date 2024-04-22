import UserProfile from '../../src/components/main/userProfile';
import ProfileImageOptions from '../../src/components/main/userProfile/profileImageOptions';
import YourQuestion from '../../src/components/main/userProfile/question';
describe('renders page when user not logged in', () => {
    it('shows title and login message when user not logged in', () => {
        const loggedIn = false;
        cy.mount(<UserProfile loggedIn={loggedIn}/>);
        cy.get('h2').contains('User Profile');
        cy.get('.login_msg_profile').contains('Please login to see your user profile');
    })
})

describe('renders page when user logged in', () => {
    beforeEach(() => {
        // question service
        cy.stub(UserProfile, 'getQuestionsByFilter').resolves([
            {
                _id: 'q1',
                title: 'question 1',
                text: 'text 1',
                tags: [{name: 'tag1'}, {name: 'tag2'}],
                asked_by: 'user1',
                ask_date_time: new Date(),
                views: 0,
                answers: 0,
                votes: 0,
                score: 0
            }
        ]);
        cy.stub(UserProfile, 'deleteQuestionById').resolves({message: 'Question deleted successfully'});
        // user service
        cy.stub(UserProfile, 'getUserById').resolves({
            _id: '1',
            username: 'user1',
            contactemail: 'user@test.com',
            profileImage: 'user-avatar-1.png'
        });
        cy.stub(UserProfile, 'updatePassword').resolves({ success: true, message: 'Password updated successfully' });
        cy.stub(UserProfile, 'updateUserProfileImage').resolves({
            success: true,
            message: 'Profile image updated successfully',
            user: {
                id: 'u1',
                username: 'user1',
                contactemail: 'user@test.com',
                profileImage: 'user-avatar-2.png'
            }
        });

        const user = {_id: 'u1', username: 'user1', contactemail: 'user@test.com'};
        const loggedIn = true;
        cy.mount(<UserProfile
            user={user}
            loggedIn={loggedIn}/>)
    })
    it('renders user profile correctly when user logged in', () => {
        cy.get('h2').contains('User Profile');
        cy.get('.profileImage')
            .should('have.attr', 'src', 'images/user-avatar-1.png')
            .and('be.visible');
        cy.get('.profileUsername').contains('Username: user1');
        cy.get('.profileEmail').contains('Contact Email: user@test.com');
        cy.get('.password_btn').should('have.text', 'Change Password');
        cy.get('.image_btn').should('have.text', 'Change Profile Picture');
        cy.get('h2').contains('Your Posts');

        cy.get('.postStats').contains('0 answers');
        cy.get('.postStats').contains('0 votes');
        cy.get('.postStats').contains('0 views');
        cy.get('.postTitle').contains('question 1');
        cy.get('.question_tags').contains('tag1');
        cy.get('.question_tags').contains('tag2');
        cy.get('.addTag_button').contains('Add Tags');
        cy.get('.question_author').contains('You');
        cy.get('.question_meta').contains('asked 0 seconds ago');
    })

    it('shows change password component when button clicked', () => {
        cy.get('.password_btn').click();
        cy.get('h3').contains('Change Password');
        cy.get(' .input_title').contains('Current Password*');
        cy.get(' .input_title').contains('New Password*');
        cy.get('#currPasswordInput').should('have.value', '');
        cy.get('#currPasswordInput').type('12345678');
        cy.get('#currPasswordInput').should('have.value', '12345678');
        cy.get('#newPasswordInput').should('have.value', '');
        cy.get('#newPasswordInput').type('87654321');
        cy.get('#newPasswordInput').should('have.value', '87654321');
        cy.get('.btn_indicator_container').contains('Change Password');
        cy.get('.mandatory_indicator').contains('* indicates mandatory fields')

    })

    it('change password when change password button clicked', () => {
        cy.get('.password_btn').click();
        cy.get('.password_btn').contains('Hide Change Password');
        cy.get('.form_postBtn').click();
        cy.get('div .input_error').contains('Current password cannot be empty');
        cy.get('div .input_error').contains('New password cannot be empty');

        cy.get('#currPasswordInput').type('12345678');
        cy.get('#newPasswordInput').type('123');
        cy.get('.form_postBtn').click();
        cy.get('div .input_error').contains('Password is too short (minimum is 8 characters)');
        cy.get('#newPasswordInput').should('have.value', '');

        cy.get('#newPasswordInput').type('123456789012345678901');
        cy.get('.form_postBtn').click();
        cy.get('div .input_error').contains('Password is too long (maximum is 20 characters)');

        cy.get('#newPasswordInput').type('87654321');
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Password updated successfully!');
        });
        cy.get('.form_postBtn').click();
        cy.get('.password_btn').contains('Change Password');
    })

    it('change profile picture component when change profile picture clicked', () => {
        cy.get('.image_btn').click();
        cy.get('.image_btn').contains('Hide Change Profile Picture');
        cy.get('h3').contains('Select New Profile Image');
        const expectedSrc = [
            'images/user-avatar-1.png',
            'images/user-avatar-2.png',
            'images/user-avatar-3.png',
            'images/user-avatar-4.png',
            'images/user-avatar-5.png',
            'images/user-avatar-6.png',
            'images/user-avatar-7.png',
            'images/user-avatar-8.png',
        ];
        cy.get('.profile_image_options img').should('have.length', 8)
            .each((el, index) => {
                cy.wrap(el).should('have.attr', 'src', expectedSrc[index]);
                cy.wrap(el).should('have.attr', 'alt', `Profile Image ${index + 1}`);
            });
        cy.get('.saveImage_btn').contains('Save');
    })

    it('should change profile picture when save button clicked', () => {
        const setSelectedProfileImage = cy.spy().as('setSelectedProfileImageSpy');
        const handleSaveProfileImage = cy.spy().as('handleSaveProfileImageSpy');
        cy.mount(<ProfileImageOptions
            setSelectedProfileImage={setSelectedProfileImage}
            handleSaveProfileImage={handleSaveProfileImage}/>);
        cy.get('.profile_image_options img').eq(1).click();
        cy.get('@setSelectedProfileImageSpy').should('have.been.calledWith', 'user-avatar-2.png');
        cy.get('.saveImage_btn').click();
        cy.get('@handleSaveProfileImageSpy').should('have.been.calledOnce');
    })

    it('should handle delete question when button clicked', () => {
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Question deleted successfully!');
        });
        cy.get('.delete_button_container').click();
    })

    it('should shows add tags when button clicked', () => {
        cy.get('.addTag_button').contains('Add Tags');
        cy.get('.addTag_button').click();
        cy.get('input').should('have.attr', 'placeholder', 'Enter new tag');
        cy.get('.addTag_btn').contains('Add');
        // validate new tag inputs
        cy.get('.addTag_btn').click();
        cy.get('.tag_error').contains('Should have at least 1 tag');
        cy.get('input').type('tag3 tag4 tag5 tag6 tag7 tag8');
        cy.get('.addTag_btn').click();
        cy.get('.tag_error').contains('Cannot have more than 5 tags');
        cy.get('input').should('contain', '');
        cy.get('input').type('123456789012345678901');
        cy.get('.addTag_btn').click();
        cy.get('.tag_error').contains('New tag length cannot be more than 20');
        cy.get('input').type('tag2');
        cy.on('window:alert', (text) => {
            expect(text).to.contains('One or more tags you are trying to add are already associated with this question');
        });
        cy.get('.addTag_btn').click();
    })

    it('should handle add tags when add button clicked', () => {
        cy.stub(YourQuestion, 'updateQuestionWithTag').resolves(
            {
                _id: 'q1',
                title: 'question 1',
                text: 'text 1',
                tags: [{name: 'tag1'}, {name: 'tag2'}, {name: 'tag3'}],
                asked_by: 'user1',
                ask_date_time: new Date(),
                views: 0,
                answers: 0,
                votes: 0,
                score: 0
            }
        )
        const question = {
            _id: 'q1',
            title: 'question 1',
            text: 'text 1',
            tags: [{name: 'tag1'}, {name: 'tag2'}],
            asked_by: 'user1',
            ask_date_time: new Date(),
            views: 0,
            answers: 0,
            votes: 0,
            score: 0
        }
        cy.mount(<YourQuestion q={question}/>)
        cy.get('.addTag_button').click();
        cy.get('input').type('tag3');
        cy.get('.addTag_btn').click();
        cy.get('.question_tag_button').contains('tag3');
        cy.get('.addTag_button').contains('Add Tags');
    })



})