export interface IGroupDonationInfoParams {
  donationId?: string;
}

export default async function getGroupDonationInfo(params: IGroupDonationInfoParams) {
  const { donationId } = params;
  console.log('donationId: ', donationId);

  return await fetch(`${process.env.API_URL}/app/donation/${donationId}`, {
    next: {
      revalidate: 60,
    },
  })
    .then((res) => {
      const data = res.json();
      return data;
    })
    .catch((error) => {
      console.log('error getGroupDonationInfo', error);
    });
}
