import React from 'react'
import {Link} from 'react-router-dom'
import { useGlobalState } from '../config/store'
import { logoutUser, setAdminInLocalStorage, setLeaderInLocalStorage, setUserInLocalStorage } from '../services/authServices'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

const Nav = () => {

    // const divStyles = {
    //     display: 'flex',
    // }
    // const linkStyles = {
    //     fontSize: '1.2em',
    //     textDecoration: 'none',
    //     margin: '.5em' 
    // }

    const {store, dispatch} = useGlobalState()
    const {loggedInUser} = store
    
    function handleLogout() {
		setUserInLocalStorage(null)
        setAdminInLocalStorage(false)
        setLeaderInLocalStorage(null)
		logoutUser()
			.then((response) => {
				console.log('Got back response on logout', response.status);
			})
			.catch((error) => {
				console.log(
					'The server may be down - caught an exception on logout:',
					error
				)
			})
		dispatch({
			type: 'setLoggedInUser',
			data: null,
		})
		dispatch({
			type: 'setAdminUser',
			data: false,
		})
        dispatch({
			type: 'setActions',
			data: [],
		})
        dispatch({
			type: 'setEvents',
			data: [],
		})
    dispatch({
			type: 'setLeader',
			data: null,
		})
	}
    const navigation = [
        { name: 'Inicio', href: '/', current: false },
        { name: 'Perfil', href: '/profile', current: false },
        { name: 'Acciones', href: '/actions', current: false },
        { name: 'Eventos', href: '/events', current: false },
        { name: 'Agregar Accion', href: '/actions/new', current: false },
        { name: 'Crear Nodo', href: '/nodes/new', current: false },
      ]

    const navigationRegister = [
        { name: 'Inicio', href: '/', current: true },
        { name: 'Ingresar', href: '/users/login', current: false },
        { name: 'Registrarse', href: '/users/register', current: false }
    ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }

    return (
        <>
        <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                    alt="Workflow"
                  />
                </div>
                {loggedInUser ? (<>
                    <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                    {/* <Link onClick={handleLogout} to="/"className={classNames('text-gray-300 hover:bg-gray-700 hover:text-white',
        'px-3 py-2 rounded-md text-sm font-medium')}>Cerrar Sesión</Link> */}
                  </div>
                </div>
                </>):(<>
                    <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigationRegister.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div></>)}
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/profile"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Perfil
                          </a>
                        )}
                      </Menu.Item>
                      {/* <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item> */}
                      <Menu.Item>
                        {({ active }) => (
                          <Link to="/"
                            onClick={handleLogout} 
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Cerrar Sesión
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
                {loggedInUser?(<>
                    {navigation.map((item) => (
                <Link to = {item.href} key= {item.name}>
                <Disclosure.Button
                  key={item.name}
                //   as="Link"
                //   to={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
                </Link>
              ))}
                </>):(<>
                    {navigationRegister.map((item) => (
                <Link to = {item.href} key= {item.name}>
                <Disclosure.Button
                  key={item.name}
                //   as="Link"
                //   to={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
                </Link>
              ))}
                </>)}

            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
        {/* <div style={divStyles}>
                <Link style={linkStyles} to="/">Home</Link>
                        {loggedInUser 
            ? (<>
                <Link style={linkStyles} to="/Profile">Profile</Link>
                <Link style={linkStyles} onClick={handleLogout} to="/">Logout</Link>
                </>)
            : (<>
                <Link style={linkStyles} to="/users/login">Login</Link>
                <Link style={linkStyles} to="/users/register">Register</Link>
                </>)
            }
            <Link style={linkStyles} to="/actions/new">Add an Action</Link>
        </div> */}
        </>
    )
}

export default Nav