import React from 'react'

import Avatar from '~/components/Avatar'
import Layout from '~/layouts/userLayout'
import { classNames } from '~/utils/classNames'

type Props = {
  children: React.ReactNode
}

const Title = ({ children }: Props) => <h5 className="text-xl font-bold text-gray-900">{children}</h5>

const Card = ({ children }: Props) => <div className="mt-2 bg-white rounded-lg border border-gray-200 p-6">{children}</div>

const Settings = (): JSX.Element => {
  return (
    <Layout metaTitle="Settings">
      <div className="mt-6 flex space-x-4 overflow-hidden">
        <div className="mt-2 w-1/2 min-h-[20vh]">
          <div className="flex flex-col items-center pb-3">
            <div className="inline-flex rounded-full shadow-lg">
              <Avatar 
                url="https://avatars.githubusercontent.com/u/38458781?v=4" 
                width={150}
                height={150}
              />
            </div>
            <button 
              type="button"
              className="btn-default mt-4 rounded-md px-12 py-1"
            >
              Upload
            </button>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div>
            <Title>Your Details</Title>
            <Card>
              <form className="space-y-6" action="#">
                <div>
                  <label className="form-label">Your name</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Joshua Galit" 
                    value="Joshua Galit" 
                    required 
                  />
                </div>
                <div>
                  <label className="form-label">Your email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="name@company.com" 
                    value="joshuaimalay@gmail.com" 
                    required 
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn-primary"
                >
                  Save Chances
                </button>
              </form>
            </Card>
          </div>
          <div className="mt-6">
            <Title>Change your password</Title>
            <Card>
              <form className="space-y-6" action="#">
                <div>
                  <label className="form-label">Current password *</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    required 
                  />
                </div>
                <div>
                  <label className="form-label">New password *</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    required 
                  />
                </div>
                <div>
                  <label className="form-label">Confirm password *</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    required 
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn-primary"
                >
                  Change password
                </button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Settings
