react
    - Object Model with fundamental set of following
        - Hooks
            - useState()
            - useContext()
                - A hook for utilizing the React.Context
                - The 'createContext(InitilaValue)'
                    - Used to define a 'global Shareable Object' that can be used across components for Data COmunication
                    - IntialValue
                        - Schema and values for the data as well as the behaiour that can beshared across components
                - Context.Provider
                    - USed by the sender compone t to send 'value'
                        - the 'value' is a complex object that has data as well as behaviors (aka Dispatch Actions)
                - Context.Consumer       
                    - Subcriber
                    - The 'useContext' 

            - useRef()
            - useReducer()
                - Looks like useState
                - Having capacbility to execute value added logic as a condition to update the state
                - returns curtent state and dispatch method that represents the current situatio of the state
                - generally use this during the state transition
                    - The Component's state is depending on the external logic (REST calls /  Sockets, etc)
                - Define an initial state
                    - the inital state that is used by the compoennt
                    - The first step of executing custom logic
                        - Initiate an external call (e.e.g AJAX) 
                    - Subscribing to the external call e.g. Promise subscription
                - Dispatch actions those will be used to perform following   (Creating a Reducer object)  
                        - Logic to initiate call
                        - Logic to process the data if the call is successful
                        - Logic that will handle errors if any  
                - useReducer(reducer, initialState)
                    - reducer(state, action)
                        - state: the Current State that will be udated based on action
                        - action: the action that is dispatched
                            - REact.Dispatch(SetStateAction)
                                - SetStateAction
                                    - reason for updating the state
                    - initialState
                        - the default state of the component
                        - the component will be notified when this is cahnged                        
            - useEffect()
                - Used for React Component Mounting and UnMounting Process
                    - Heavy Load operations
                        - AJAX Calls
                - executed post rendering        
                - Syntax
```` javascript
            useEffect(()=>{
                 ... Mounting....
                 // any state update will cause the DOM changes
                 // state changes are dependant on exteranl calls 
                 return()=>{
                    .... unmounting
                 }
            },[]); // dependency parameter to indicate the state update    
````
            - useMemo()
            - useCallback()
            -... and many more
            - create a custom hook to execute similar logic that updates state in different component
        - Events
        - JSX/TSX
        - Lifecycle Management
        - The Component<P,S> class
            - P, the 'props'
                - communication of 'data' and 'behavior' across components having parent child relationship
                - an 'immutable' object
            - S, the 'state'
                - Local Components state defined using 'useState()' hook
```` javascript
        const [x, setX] = useState(0);
````
            - the 'x' is the state for the component
            - setX, the React.SetStateAction()
                - This will be dispatched when an event is raised on Compoennt that causes the state to update and hence the component's UI
            - The 'unidirectional data flow'
                - Data is passsed from state to UI
                - On Event of UI from dispatch action to State property     
react-dom
    - Mount and Rendering of the component   

# Component Practices
    - Create a reusable component if the same UI is repeated across multiple components
        - Define Property System for Passing data from parent to Child
        - Define Functions those will be raised at child level so that data can be emitted to parent over the data binding
        - To Notify the state updates across components make sure that the child knows which property will be updated on change from parent  to child level 
    - Create a custom hook if the similar functionaly needs to be executed at component level that updates the '
    'State'   
        - Why?
            - We cannot access or execute a hook inside a custom function executing inside component   
            - One hook cannot access another hook
        - E.g.
            - Create a Custom Hook that will be responsible to manage external async calls and update the state for the component based on custom logic    

    

# Usew of WebPack
https://www.webnethelper.com/2021/10/reactjs17x-creating-application-with.html
 

# Redux
    - Action, what has happened
        - a function with optional input parameters
        - returns Object literal as follows
```` javascript
        {
            type:'ACTION_TYPE',
            payload
        }
````
    - Reducer, how it has happedn and whats the data received
        - a Pure function
        - returns an updated state
```` javascript
        const reducer = (state, action)=>{}
````
    - Store, a single stoure of truth that contains global data 
        - COntains Schema

# Implementation Redux
    - redux
        - base object model
        - createStore() function (deprecated)
            - applyMiddleware()
    - react-redux
        - bridge between react and redux
        - Hooks
            - useDispatch()
                - Dispatch actions from UI
            - useSelector()
                - Subscribe to store
                - The UI will be notified data from store over the subscription
            - connet(), deprecated
                - Connect Compoennt with Store    
                - mapStateToProps()
                    - replaced using useSelector()
                - mapDispathToProps()
                    - repleced usign useDispatch()  
            - Provider
                - An ExoticComponent that loads the 'store' as application levele and make sure that its is available for all react components           
    - @reduxjs/toolkit
        - Simple, optimized, powerfull, and effective
        - configureStore({
            reducer:[ALL-REDUCERS],
            middleware:[MIDDLEWARES]
        })
        - createAction(type)
            - USed to Define an Action
            - return the object literal
                - { payload:}   
        - createReducer(intialState, (builder)=>{})
            - builder
                - an object that is used to define cases to monitor actions those are dispatched
                - builder.addCase(createAction-type, (state, action)=>{})
                    - state: the state to be mutated based on 'payload' returned from 'action' 
    - redux-saga, package
        - saga, package
        - redux-saga/effects
            - Set opf operators to listen to actions, manage async calls, and dispatch output actions
            - take() and takeLatest()
                - Listent to the action that is dispatch
                - also has capacility to read the 'payload' returned by the action
            - call()
                - call the function that performs async calls e.g. AJAX calls
            - put()
                - dispatch output action based on async call execution
            - all()
                - Monitor all actions listened by and dispatched from SAGA  
            - createSagaMiddleware()
                - create a SAGA middleware instance so that it can be configured while creating the store using 'configureStore()'
                    - run()
                        - Keep running the Saga Middleware at root level
       - Generaor functions
```` javascript
    function* functionName(){
        yield RESULT
    }
`````
        - Rules for reating SAGA Middleware
            - For Each Input Action generator function  there exist and Output Action generator function
            - CReate a root generator function that will keep executing all  Input Action generator functions at application root level where the store is created
    - Redux USe-Case
        - If one of the child component needs data from the store at first load of the component as well as for any changes in store, then use following practices aka rules
            - define a dynamic function in props using 'Function'
            - execute this function in 'useEffct()' so that its will get the data from store and use in rendering and then it will stop

            - to prevent unnecessary child component component update
                - use 'useCallback()' hook that will initially dispatch the action to get data from server and make it available to child 

# React 16.x+ to  18.x
- Managing the Lazy Loading
    - SSR STreaming with 
        - lazy Loading
            - The <Suspense> component
```` javascript
        const SomeComponent = React.lazy(()=> import('COMPONENT-FILE-PATH'))
            - COMPONENT-FILE-PATH
                - May be available in WebPack Build
                    - npm run build
                - May be received from external Web Server    

        return (
            <Suspense fallback={YOUR UI}>
                <SomeComponent/>
            </Suspese>
        )        
````
        - Code-Splitting
- Streaming aka Server-Side-Rendering (SSR)
    - HTML and Static Data Generation MUST be handled on Server
    - Pre-React 18
        - SSR with Node.js + Express
            - Node.js 'fs' and its readFile() async method
```` javascript
     app = express();
     app.get('/', (req,resp_=>{
            // extract HTML String + Data from App Component
            var app = ReactDOMServer.renderToString(<App/>);
            // Read index file
            var index = path.resolve('./build/index.html')

            // read file and  resopod it

            fs.readFile(index, 'utf-8', (err,data)=>{
                res.send(data contactinate it with 'app')
            })

     })   
````
    - ReactDOM.hydrate(<App/>)
- Optimization                 


                                              