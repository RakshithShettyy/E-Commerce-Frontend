import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { data } from "autoprefixer";

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors);
  const [edit, setEdit] = useState(false);
  const handleEditProfile = () => {
    setEdit(!edit);
  };

  const handleFormSubmit = () => {
    console.log(alert("Data Saved!"));
    setEdit(!edit);
  };
  return (
    <>
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')`,
            }}>
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0px)" }}>
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0">
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <Button
                        className=""
                        type="button"
                        onClick={handleEditProfile}>
                        Edit Details
                      </Button>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          22
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Friends
                        </span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          10
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Photos
                        </span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          89
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Comments
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  {edit ? (
                    <>
                      <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                        Jenna Stones
                      </h3>
                      <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                        <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                        Los Angeles, California
                      </div>
                      <div className="mb-2 text-blueGray-600 mt-10">
                        <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                        Solution Manager - Creative Tim Officer
                      </div>
                      <div className="mb-2 text-blueGray-600">
                        <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                        University of Computer Science
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-full flex justify-center text-left">
                        <Card className="w-3/6">
                          <CardHeader>Edit Details</CardHeader>
                          {/* <CardDescription>
                            Edit the profile data below
                          </CardDescription> */}
                          <CardContent>
                            <Form
                              onSubmit={handleSubmit(() => {
                                console.log(data);
                              })}>
                              <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5 mt-5">
                                  <Label htmlFor="name">First Name</Label>
                                  <Input
                                    {...register("firstName", {
                                      required: true,
                                      minLength: 4,
                                    })}
                                    id="first_name"
                                    placeholder="Enter first name"
                                  />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                  <Label htmlFor="name">Last Name</Label>
                                  <Input
                                    id="last_name"
                                    placeholder="Enter last name"
                                  />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                  <Label htmlFor="phone">Phone</Label>
                                  <Input
                                    id="phone"
                                    placeholder="Enter your phone"
                                  />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                  <Label htmlFor="address">Address</Label>
                                  <Input
                                    id="address"
                                    placeholder="Enter your address"
                                  />
                                </div>
                              </div>
                              <Button className="mt-5" type="submit">
                                Save
                              </Button>
                            </Form>
                            <div className="w-100 flex justify-center">
                              <Button
                                className="mt-5"
                                onClick={handleFormSubmit}>
                                Save
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        An artist of considerable range, Jenna the name taken by
                        Melbourne-raised, Brooklyn-based Nick Murphy writes,
                        performs and records all of his own music, giving it a
                        warm, intimate feel with a solid groove structure. An
                        artist of considerable range.
                      </p>
                      <a href="#pablo" className="font-normal text-pink-500">
                        Show more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Profile;
