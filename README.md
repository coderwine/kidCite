# kidCite
A simple site where users can save "things said" by their children.
 -  Users hasMany Kids
 -  Users hasMany Quotes (refKids)
 -  Kids belongTo Users
 -  Quotes belongTo Users  

# Main Goals:
 -  This is a project to help me work through building a small application that utilizes database association.
 -  Another goal was to utilize validations within the backend to check against various items of interest (such as IDs and null fields)

# Current Build
 - Endpoints allow Users to create an account, add children to their account and quotes with a reference to that particular child.
 - Front end will govern how information will be passed to plug in that information as needed.
