import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import { FaTrash, FaPen, FaCheck } from "react-icons/fa";
import { useState } from "react";
import ConfirmationModal from "../../components/ConfirmationModal";

const ProfileCard = ({ profile, onDelete, onApprove, onEdit }) => {
  const [show, setShow] = useState(false);
  const [showApprove, setShowApprove] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleDelete = (profile) => {
    setSelectedProfile(profile);
    setShow(true);
  };

  const confirmDelete = async () => {
    setShow(false);
    onDelete(selectedProfile._id);
  };

  const cancelDelete = () => {
    setShow(false);
    setSelectedProfile(null);
  };

  const cancelApprove = () => {
    setShowApprove(false);
    setSelectedProfile(null);
  };

  const confirmApprove = async () => {
    setShowApprove(false);
    onApprove(selectedProfile._id);
  };

  const handleApprove = (profile) => {
    setSelectedProfile(profile);
    setShowApprove(true);
  };

  const handleEdit = (profile) => {
    onEdit(profile._id);
  };

  return (
    <>
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          component="img"
          height="50"
          image={profile.photo}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
          }}
          alt="image"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {profile.name}
            <div>
              {profile.isApproved ? (
                <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
                  Approved
                </span>
              ) : (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                  Pending
                </span>
              )}
            </div>
          </Typography>

          <Typography variant="body2" color="text.secondary">
            <strong>Full name: </strong>
            {profile.name}
            <br />
            <strong>age: </strong>
            {profile.age ? `${profile.age} - years old` : "-"}

            <br />
            <strong>Gender: </strong>
            {profile.gender ? `${profile.gender}` : "-"}
          </Typography>
        </CardContent>
        <CardActions>
          {profile.isApproved ? null : (
            <Button
              size="small"
              variant="outlined"
              color="success"
              startIcon={<FaCheck />}
              onClick={() => handleApprove(profile)}
            >
              Approve
            </Button>
          )}
          <Button
            size="small"
            variant="outlined"
            color="primary"
            startIcon={<FaPen />}
            onClick={() => handleEdit(profile)}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            startIcon={<FaTrash />}
            onClick={() => handleDelete(profile)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>

      <ConfirmationModal
        show={show}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this profile?"
      />

      <ConfirmationModal
        show={showApprove}
        onClose={cancelApprove}
        onConfirm={confirmApprove}
        message="Are you sure you want to approve this profile?"
      />
    </>
  );
};

export default ProfileCard;
