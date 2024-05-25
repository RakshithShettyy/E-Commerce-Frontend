import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm, Controller } from "react-hook-form";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase-config";
import { useSelector } from "react-redux";
import { LineWave } from "react-loader-spinner";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const Profile = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = useSelector((state) => state?.user?.user?.uid);
  const [profileData, setProfileData] = useState(null);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    type: "default",
    visible: false,
  });

  const handleEditProfile = () => {
    setEdit(!edit);
  };

  const fetchProfileData = async () => {
    setLoading(true);
    if (user) {
      try {
        const docRef = doc(db, "users", user);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfileData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    fetchProfileData();
  }, [user]);
  const handleFormSubmit = async (data) => {
    if (!user) {
      alert("User not logged in");
      return;
    }

    try {
      await setDoc(doc(db, "users", user), data);

      setAlert({
        message: "Data Saved Successfully!",
        type: "success",
        visible: true,
      });
      toast.success("Data Saved!");
      fetchProfileData();
    } catch (error) {
      console.log(error);
      console.error("Error saving data: ", error);
      alert("Failed to save data.");
    }

    setEdit(false);
  };

  return (
    <>
      <main className="profile-page">
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
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
              <div className="px-6 ">
                <div>
                  {loading ? (
                    <div className="flex justify-center">
                      <LineWave
                        visible={true}
                        height="100"
                        width="100"
                        color="#000000"
                        ariaLabel="line-wave-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        firstLineColor=""
                        middleLineColor=""
                        lastLineColor=""
                      />
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center ">
                          <div className="relative">
                            <img
                              alt="..."
                              src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                              className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                            />
                          </div>
                        </div>
                        <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center ">
                          {!edit && (
                            <div
                              className="py-6 px-3 mt-32 sm:mt-0 "
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}>
                              <Button
                                className=""
                                type="button"
                                onClick={handleEditProfile}>
                                Edit Details
                              </Button>
                            </div>
                          )}
                        </div>
                        <div className="w-full lg:w-4/12 px-4 lg:order-1">
                          <div className="flex justify-center py-4 lg:pt-4 pt-8">
                            <div className="mr-4 p-3 text-center">
                              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                22
                              </span>
                              <span className="text-sm text-blueGray-400">
                                Wishlist
                              </span>
                            </div>
                            <div className="mr-4 p-3 text-center">
                              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                10
                              </span>
                              <span className="text-sm text-blueGray-400">
                                Cart
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center mt-12">
                        {!edit ? (
                          <>
                            <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 capitalize">
                              {profileData?.firstName +
                                " " +
                                profileData?.lastName}
                            </h3>
                            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                              <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400 capitalize"></i>
                              {profileData?.address}
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
                              <Card className="w-3/6 ">
                                <CardHeader>Edit Details</CardHeader>
                                <CardContent>
                                  <form
                                    onSubmit={handleSubmit(handleFormSubmit)}>
                                    <div className="grid w-full items-center gap-4">
                                      <div className="flex flex-col space-y-1.5 mt-5">
                                        <Label htmlFor="first_name">
                                          First Name
                                        </Label>
                                        <Controller
                                          name="firstName"
                                          control={control}
                                          rules={{
                                            required: true,
                                            minLength: 4,
                                          }}
                                          render={({ field }) => (
                                            <Input
                                              {...field}
                                              id="first_name"
                                              placeholder="Enter first name"
                                            />
                                          )}
                                        />
                                        {errors.firstName && (
                                          <span>
                                            First name is required and should be
                                            at least 4 characters.
                                          </span>
                                        )}
                                      </div>
                                      <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="last_name">
                                          Last Name
                                        </Label>
                                        <Controller
                                          name="lastName"
                                          control={control}
                                          rules={{
                                            required: true,
                                            minLength: 4,
                                          }}
                                          render={({ field }) => (
                                            <Input
                                              {...field}
                                              id="last_name"
                                              placeholder="Enter last name"
                                            />
                                          )}
                                        />
                                        {errors.lastName && (
                                          <span>
                                            Last name is required and should be
                                            at least 4 characters.
                                          </span>
                                        )}
                                      </div>
                                      <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Controller
                                          name="phone"
                                          control={control}
                                          rules={{
                                            required: true,
                                            pattern: /^[0-9]{10}$/,
                                          }}
                                          render={({ field }) => (
                                            <Input
                                              {...field}
                                              id="phone"
                                              placeholder="Enter your phone"
                                            />
                                          )}
                                        />
                                        {errors.phone && (
                                          <span>
                                            Phone number is required and should
                                            be 10 digits.
                                          </span>
                                        )}
                                      </div>
                                      <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="address">Address</Label>
                                        <Controller
                                          name="address"
                                          control={control}
                                          rules={{ required: true }}
                                          render={({ field }) => (
                                            <Input
                                              {...field}
                                              id="address"
                                              placeholder="Enter your address"
                                            />
                                          )}
                                        />
                                        {errors.address && (
                                          <span>Address is required.</span>
                                        )}
                                      </div>
                                    </div>
                                    <Button className="mt-5" type="submit">
                                      Save
                                    </Button>
                                    <Button
                                      className="mt-5 ml-10"
                                      variant="secondary"
                                      onClick={() => {
                                        setEdit(!edit);
                                      }}>
                                      Cancel
                                    </Button>
                                  </form>
                                </CardContent>
                              </Card>
                            </div>
                          </>
                        )}
                      </div>
                    </>
                  )}

                  <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                          An artist of considerable range, Jenna the name taken
                          by Melbourne-raised, Brooklyn-based Nick Murphy
                          writes, performs and records all of his own music,
                          giving it a warm, intimate feel with a solid groove
                          structure. An artist of considerable range.
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
          </div>
        </section>
      </main>
    </>
  );
};

export default Profile;
