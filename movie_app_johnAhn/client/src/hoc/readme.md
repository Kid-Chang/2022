higer-order component is a function that takes a componet and returns a new component.

This project, use this component to check that user has Access right and decide to user can access this page.
(ex. if logined user acces login page, hoc automatically goto another page)

`const EnhancedComponent = higerOrderComponent(WrapperdComponent);`
